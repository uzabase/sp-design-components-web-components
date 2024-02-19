<script lang="ts">
  function checkboxDispatch(event:CustomEvent) {
    console.log(event.detail);
  }
</script>

<main>
  <div>
    <h1>button</h1>
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
    <h1>checkbox</h1>
    <sp-checkbox></sp-checkbox>
    <sp-checkbox-text text="label"></sp-checkbox-text>
    <sp-checkbox-list text="label"></sp-checkbox-list>
    <h2>onChange</h2>
    <sp-checkbox on:change={checkboxDispatch}></sp-checkbox>
    <sp-checkbox-text text="label" on:change={checkboxDispatch}></sp-checkbox-text>
    <sp-checkbox-list text="label" on:change={checkboxDispatch}></sp-checkbox-list>
    <h2>formとしての働き</h2>
    <form>
      <input type="checkbox" name="inputFormName" value="primitive" />
      <sp-checkbox name="inputFormName" value="value1"></sp-checkbox>
      <sp-checkbox-text text="label" name="inputFormName" value="value2"></sp-checkbox-text>
      <sp-checkbox-list text="label" name="inputFormName" value="value3"></sp-checkbox-list>
      <input type="submit" />
    </form>
  </div>
  <div>
    <h1>icon</h1>
    <sp-icon size="medium" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="medium" type="company" color="black" label=""></sp-icon>
    <sp-icon size="small" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="small" type="company" color="black" label=""></sp-icon>
    <sp-icon size="large" type="home" color="black" label="ホーム"></sp-icon>
    <sp-icon size="large" type="company" color="black" label=""></sp-icon>
  </div>
</main>

