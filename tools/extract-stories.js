#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

/**
 * Extract story information from all story files
 * This script extracts component metadata, stories, and code examples
 * for use in an MCP server that explains components
 */
async function extractStories() {
  // Find all story files
  const storyFiles = globSync('stories/**/*.story.ts', {
    cwd: path.resolve(__dirname, '..')
  });

  const componentsData = [];

  for (const storyFile of storyFiles) {
    try {
      const fullPath = path.resolve(__dirname, '..', storyFile);
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Extract component name from the file path
      const componentName = path.basename(storyFile, '.story.ts');
      
      // Parse the story file content directly
      const storyMatches = [...content.matchAll(/export const ([A-Za-z0-9_]+)(?::|=)/g)];
      
      // Extract meta information
      const metaMatch = content.match(/const meta = {([^}]*)}(?: satisfies Meta<[^>]*>)?;/s);
      const metaContent = metaMatch ? metaMatch[1] : '';
      
      // Extract argTypes
      const argTypesMatch = metaContent.match(/argTypes: {([^}]*)}(?:,|\s*$)/s);
      const argTypes = argTypesMatch ? parseArgTypes(argTypesMatch[1]) : {};
      
      // Extract description
      const descriptionMatch = metaContent.match(/description: ['"]([^'"]*)['"]/);
      const description = descriptionMatch ? descriptionMatch[1] : '';
      
      // Extract stories
      const stories = [];
      
      for (const [_, storyName] of storyMatches) {
        // Skip internal or utility exports
        if (storyName === 'default' || storyName.startsWith('_')) {
          continue;
        }
        
        // Extract story content - find the story block
        const storyStartRegex = new RegExp(`export const ${storyName}[^{]*{`, 's');
        const storyStartMatch = content.match(storyStartRegex);
        
        if (!storyStartMatch) continue;
        
        const startIndex = storyStartMatch.index + storyStartMatch[0].length;
        let braceCount = 1;
        let endIndex = startIndex;
        
        // Find the matching closing brace
        for (let i = startIndex; i < content.length; i++) {
          if (content[i] === '{') braceCount++;
          if (content[i] === '}') braceCount--;
          
          if (braceCount === 0) {
            endIndex = i;
            break;
          }
        }
        
        const storyContent = content.substring(startIndex, endIndex);
        
        // Check if story has dev-only tag
        const tagsMatch = storyContent.match(/tags: \[([^\]]*)\]/);
        if (tagsMatch && tagsMatch[1].includes('!dev-only')) {
          continue;
        }
        
        // Extract code example
        let codeExample = '';
        
        // Try to find render function with html template literal
        const renderIndex = storyContent.indexOf('render:');
        if (renderIndex !== -1) {
          // Find the html template literal
          const htmlStartIndex = storyContent.indexOf('html`', renderIndex);
          if (htmlStartIndex !== -1) {
            // Find the closing backtick, accounting for nested template literals
            let backtickCount = 1;
            let htmlEndIndex = -1;
            
            for (let i = htmlStartIndex + 5; i < storyContent.length; i++) {
              if (storyContent.substring(i, i+1) === '`') {
                backtickCount--;
                if (backtickCount === 0) {
                  htmlEndIndex = i;
                  break;
                }
              }
            }
            
            if (htmlEndIndex !== -1) {
              codeExample = storyContent.substring(htmlStartIndex + 5, htmlEndIndex).trim();
            }
          }
        }
        
        // If we still don't have a code example, try to extract it from the entire story content
        if (!codeExample) {
          // Look for html template literals in the story content
          const htmlMatches = [];
          let searchIndex = 0;
          
          while (true) {
            const htmlStartIndex = storyContent.indexOf('html`', searchIndex);
            if (htmlStartIndex === -1) break;
            
            // Find the closing backtick
            let backtickCount = 1;
            let htmlEndIndex = -1;
            
            for (let i = htmlStartIndex + 5; i < storyContent.length; i++) {
              if (storyContent.substring(i, i+1) === '`') {
                backtickCount--;
                if (backtickCount === 0) {
                  htmlEndIndex = i;
                  break;
                }
              }
            }
            
            if (htmlEndIndex !== -1) {
              htmlMatches.push(storyContent.substring(htmlStartIndex + 5, htmlEndIndex).trim());
              searchIndex = htmlEndIndex + 1;
            } else {
              break;
            }
          }
          
          // Use the longest HTML template as the code example
          if (htmlMatches.length > 0) {
            codeExample = htmlMatches.reduce((longest, match) => {
              return match.length > longest.length ? match : longest;
            }, '');
          }
        }
        
        // If still no code example, check for args and use the default render from meta
        if (!codeExample) {
          const argsMatch = storyContent.match(/args: ({[^}]*})/s);
          if (argsMatch && metaContent) {
            // Try to find the default render in meta
            const metaRenderIndex = metaContent.indexOf('render:');
            if (metaRenderIndex !== -1) {
              const htmlStartIndex = metaContent.indexOf('html`', metaRenderIndex);
              if (htmlStartIndex !== -1) {
                // Find the closing backtick
                let backtickCount = 1;
                let htmlEndIndex = -1;
                
                for (let i = htmlStartIndex + 5; i < metaContent.length; i++) {
                  if (metaContent.substring(i, i+1) === '`') {
                    backtickCount--;
                    if (backtickCount === 0) {
                      htmlEndIndex = i;
                      break;
                    }
                  }
                }
                
                if (htmlEndIndex !== -1) {
                  codeExample = metaContent.substring(htmlStartIndex + 5, htmlEndIndex).trim();
                  
                  // Add the args
                  try {
                    // Clean up the args string for parsing
                    let argsStr = argsMatch[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
                    argsStr = argsStr.replace(/'/g, '"');
                    argsStr = argsStr.replace(/,\s*}/g, '}');
                    
                    // Handle special cases like function references
                    argsStr = argsStr.replace(/action\([^)]*\)/g, '"[action function]"');
                    
                    const args = JSON.parse(argsStr);
                    codeExample += '\n\n// With these args:\n' + JSON.stringify(args, null, 2);
                  } catch (e) {
                    console.error(`Error parsing args for ${storyName} in ${storyFile}:`, e);
                  }
                }
              }
            }
          }
        }
        
        // Extract description
        const storyDescriptionMatch = storyContent.match(/description: ['"]([^'"]*)['"]/);
        const storyDescription = storyDescriptionMatch ? storyDescriptionMatch[1] : '';
        
        stories.push({
          name: storyName,
          description: storyDescription,
          codeExample
        });
      }
      
      componentsData.push({
        componentName,
        description,
        argTypes,
        stories
      });
      
    } catch (error) {
      console.error(`Error processing ${storyFile}:`, error);
    }
  }
  
  // Ensure dist directory exists
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write the extracted data to a JSON file in the dist directory
  const outputFile = 'stories.json';
  const outputPath = path.resolve(distDir, outputFile);
  
  fs.writeFileSync(
    outputPath,
    JSON.stringify(componentsData, null, 2)
  );
  
  console.log(`Extracted data for ${componentsData.length} components to dist/${outputFile}`);
}

/**
 * Parse argTypes from string content
 */
function parseArgTypes(content) {
  const result = {};
  const lines = content.split('\n');
  
  let currentKey = null;
  let currentValue = {};
  
  for (const line of lines) {
    const keyMatch = line.match(/([a-zA-Z0-9_]+): ?{/);
    if (keyMatch) {
      if (currentKey) {
        result[currentKey] = currentValue;
      }
      currentKey = keyMatch[1];
      currentValue = {};
      continue;
    }
    
    if (currentKey) {
      const typeMatch = line.match(/type: ['"]([^'"]*)['"]/);
      if (typeMatch) {
        currentValue.type = typeMatch[1];
      }
      
      const controlMatch = line.match(/control: ?{ ?type: ['"]([^'"]*)['"]/);
      if (controlMatch) {
        currentValue.control = { type: controlMatch[1] };
      }
      
      const optionsMatch = line.match(/options: \[([^\]]*)\]/);
      if (optionsMatch) {
        try {
          const optionsStr = optionsMatch[1].replace(/'/g, '"');
          currentValue.options = JSON.parse(`[${optionsStr}]`);
        } catch (e) {
          console.error(`Error parsing options for ${currentKey}:`, e);
        }
      }
    }
  }
  
  if (currentKey) {
    result[currentKey] = currentValue;
  }
  
  return result;
}

// Run the extraction
extractStories().catch(console.error);
