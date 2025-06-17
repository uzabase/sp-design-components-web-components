/**
 * @type {import('@custom-elements-manifest/analyzer').CustomElementsManifestConfig}
 */
export default {
  globs: ['src/components/**/*.ts'],
  outdir: 'dist',
  plugins: [
    {
      name: 'exclude-private-and-protected-members',
      packageLinkPhase({ customElementsManifest }) {
        if (customElementsManifest && customElementsManifest.modules) {
          customElementsManifest.modules.forEach(module => {
            if (module.declarations) {
              module.declarations.forEach(declaration => {
                if (declaration.members) {
                  declaration.members = declaration.members.filter(member => 
                    member.privacy !== 'private' && member.privacy !== 'protected'
                  );
                }
              });
            }
          });
        }
      }
    }
  ]
};
