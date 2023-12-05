<script lang="ts">
  import "../../src/index";

  let checked = false;
  let indeterminate = false;
  let disabled = false;
</script>

<main>
  <section>
    <h1>Button</h1>
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
    <sp-button label="あああああああ" disabled on:click={()=>(console.log("fire"))}></sp-button>
  </section>
  <section>
    <h1>Checkbox</h1>
    <sp-checkbox></sp-checkbox>
    <sp-checkbox checked={true}></sp-checkbox>
    <sp-checkbox indeterminate={true}></sp-checkbox>
    <sp-checkbox disabled={true}></sp-checkbox>
    <sp-checkbox value="checkboxValue" name="checkboxName" id="checkboxId"></sp-checkbox>
    <section>
      <h2>外側からチェックを変えるテスト</h2>
      <sp-button on:click={()=>(checked = !checked)} label="Check/UnCheck"></sp-button> Checked: {checked}
      <sp-button on:click={()=>(indeterminate = !indeterminate)} label="Indeterminate/UnIndeterminate"></sp-button> Indeterminate: {indeterminate}
      <sp-button on:click={()=>(disabled = !disabled)} label="Disable/UnDisable"></sp-button> Disable: {disabled}
      <sp-checkbox id="test" checked={checked} disabled={disabled} indeterminate={indeterminate} on:change={(e)=>(console.log(e))}></sp-checkbox>
    </section>
    <section>
      <h2>Formとしての働き</h2>
      <form>
        <input type="checkbox" name="checkboxFormGroup" value="primitive1">
        <input type="checkbox" name="checkboxFormGroup" value="primitive2">
        <sp-checkbox name="checkboxFormGroup" value="value1"></sp-checkbox>
        <sp-checkbox name="checkboxFormGroup" value="value2"></sp-checkbox>
        <sp-checkbox name="checkboxFormGroup" value="value3"></sp-checkbox>
        <input type="submit">
      </form>
    </section>
  </section>
  <section>
    <h1>CheckboxText</h1>
    <sp-checkbox-text checked={true} label="チェックボックステキスト" on:change={(e)=>(console.log(e))}></sp-checkbox-text>
  </section>
</main>

<style>
</style>
