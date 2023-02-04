<script>
import Icon from './Icon.svelte';
export let options;
export let defaultValue;
export let handleClickFunc;
export let width;

let isClickExpanded = false;

</script>
<style>
/* resets */
ul { list-style: none; padding: 0; }
ul li { display: inline-block; position: relative; }

/* minimal dropdown CSS */
li > ul {
    left: -9999px;
    position: absolute;
    visibility: hidden;
}

li:hover > ul, li:focus-within > ul {
    left: 0;
    visibility: visible;
}

.visible {
    left: 0;
    visibility: visible;
}


.box {
    border: 1px solid #f25b3d;
    border-radius: var(--box-radius);
    margin: auto;
    background-color: #f25b3d;
    cursor: pointer;
}

.title {
    box-sizing: border-box;
    padding: 0.5rem;
}

.option {
    box-sizing: border-box;
    background-color: #f25b3d;
    width: 100%;
    border: 1px solid black;
    border-radius: var(--box-radius);
    padding: 0.5rem;
}

</style>

<ul>
<li width={width} class="box"><div class="title" on:click="{()=>isClickExpanded = !isClickExpanded}">{options[defaultValue]} <Icon name="chevron"/></div>
        <ul class:visible={isClickExpanded}>
            {#each options as option}
            <li class="option" 
                on:click={()=>isClickExpanded=false}
                on:click={handleClickFunc(key)}>{value}
            </li>
            {/each}
        </ul>
    </li>
</ul>

