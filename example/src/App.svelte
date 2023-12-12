<script lang="ts">
  import "../../src/components/button/sp-button.ts"
  import "../../src/components/checkbox/sp-checkbox.ts"
  import "../../src/components/checkbox/sp-checkbox-list.ts"
  import "../../src/components/checkbox/sp-checkbox-text.ts"
  import "../../src/components/icon/sp-icon.ts"
</script>

<main>
  <div>
  <sp-button></sp-button>
  <sp-button text="なんもないやつ"></sp-button>
  <sp-button text="disabled trueやつ" disabled={true}></sp-button>
  <sp-button text="disabled falseやつ" disabled={false}></sp-button>
  <sp-button text="classNameあるやつ" class="classdayo"></sp-button>
  <sp-button text="loadingあるやつ" loading="{true}"></sp-button>
  <sp-button text="selectedあるやつ" selected="{true}"></sp-button>
  <sp-button text="destructive" type="destructive"></sp-button>
  <sp-button text="appearance" appearance="fill"></sp-button>
  <sp-button text="size" size="width160"></sp-button>
  <sp-button text="onClickやつ" on:click={()=>(console.log("fire"))}></sp-button>
</div>
  <div>
    <sp-checkbox></sp-checkbox>
    <sp-checkbox-list text="label"></sp-checkbox-list>
    <sp-checkbox-text text="label"></sp-checkbox-text>
  </div>
  <div>
    <sp-icon size="medium" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="medium" type="company" color="black" label=""></sp-icon>
    <sp-icon size="small" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="small" type="company" color="black" label=""></sp-icon>
    <sp-icon size="large" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="large" type="company" color="black" label=""></sp-icon>
  </div>
</main>

