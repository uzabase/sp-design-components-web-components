<script lang="ts">
  import "../../src/index";
</script>

<main>
  <sp-checkbox on:change={(e)=>(console.log(e))}></sp-checkbox>
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
</main>

<style>
</style>
