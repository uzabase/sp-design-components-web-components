<script lang="ts">
    import { SpIcon } from "../../src/components/icon/sp-icon";
</script>

<main>
  <div>
  <sp-button></sp-button>
  <sp-button label="なんもないやつ"></sp-button>
  <sp-button label="disabled trueやつ" disabled={true}></sp-button>
  <sp-button label="disabled falseやつ" disabled={false}></sp-button>
  <sp-button label="classNameあるやつ" class="classdayo"></sp-button>
  <sp-button label="loadingあるやつ" loading="{true}"></sp-button>
  <sp-button label="selectedあるやつ" selected="{true}"></sp-button>
  <sp-button label="destructive" type="destructive"></sp-button>
  <sp-button label="appearance" appearance="fill"></sp-button>
  <sp-button label="size" size="width160"></sp-button>
  <sp-button label="onClickやつ" on:click={()=>(console.log("fire"))}></sp-button>
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

<style>
</style>
