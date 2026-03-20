<script lang="ts" module>
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { type VariantProps, tv } from "tailwind-variants";

  export const ButtonVariants = tv({
    base: "flex rounded-xl text-lg font-semibold justify-center items-center bg-button text-button-foreground border-4 px-4 py-2 active:scale-95 active:brightness-95 transition-transform aria-pressed:bg-primary aria-pressed:text-primary-foreground disabled:opacity-50 disabled:pointer-events-none",
    variants: {
      variant: {
        dashed: "p-1",
        solid: "",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  });

  export type ButtonVariant = VariantProps<typeof ButtonVariants>["variant"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> & {
    variant?: ButtonVariant;
    onclick?: HTMLButtonAttributes["onclick"];
  };
</script>

<script lang="ts">
  let {
    class: className,
    variant = "solid",
    ref = $bindable(null),
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

<button
  bind:this={ref}
  data-slot="card-button"
  class={cn(ButtonVariants({ variant }), className)}
  {...restProps}
>
  {#if variant === "dashed"}
    <span
      class="flex text-2xl gap-2 justify-center items-center w-full h-full rounded-lg border-2 border-dashed border-primary p-8"
    >
      {@render children?.()}
    </span>
  {:else}
    {@render children?.()}
  {/if}
</button>
