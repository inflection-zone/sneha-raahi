<script lang="ts">
    export let source;
    export let cls;
    export let w;
    export let h;
    let src;

	async function loadImage() {
        const res = await fetch(source)
        const blb = await res.blob();
        src=URL.createObjectURL(blb);
        //console.log(src)
    }
    (async () => {
        await loadImage();
    })();

</script>

<img src={src} alt="" class={cls} width="{w}" height="{h}"/>