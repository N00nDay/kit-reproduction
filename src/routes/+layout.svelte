<script lang="ts">
  import type { ActionData } from ".svelte-kit/types/src/routes/registration/$types";
  import { enhance, applyAction } from "$app/forms";

  export let form: ActionData;

  function onInput(input: "first_name" | "last_name") {
    if (form && form.errors && form.errors[input]) {
      form.errors[input] = undefined;
    }
  }
</script>

<div style="height:100%;width:100%;">
  <slot />
</div>

<form
  class="space-y-6"
  method="POST"
  action="/registration"
  use:enhance={() => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        update();
      } else if (result.type === "invalid") {
        form = result.data;
        await applyAction(result);
      } else {
        await applyAction(result);
      }
    };
  }}
>
  <input
    type="text"
    name="first_name"
    id="first_name"
    on:input={() => onInput("first_name")}
  />
  <br />
  {#if form?.errors.first_name}
    <span style="color:red;">{form?.errors.first_name}</span>
  {/if}
  <br />

  <input
    type="text"
    name="last_name"
    id="last_name"
    on:input={() => onInput("last_name")}
  />
  <br />
  {#if form?.errors.last_name}
    <span style="color:red;">{form?.errors.last_name}</span>
  {/if}
  <br />

  <div style="margin-top:8px;">
    <button type="submit">Submit</button>
  </div>
</form>
