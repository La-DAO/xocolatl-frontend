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
    border: 1px solid white;
    border-radius: 5px;
    margin: auto;
    background-color: #613516;
    cursor: pointer;
}

.title {
    box-sizing: border-box;
    padding: 0.5rem;
}

.option {
    box-sizing: border-box;
    background-color: #613516;
    width: 100%;
    border: 1px solid white;
    padding: 0.5rem;
}

</style>

<ul>
<li width={width} class="box"><div class="title" on:click="{()=>isClickExpanded = !isClickExpanded}">{options[defaultValue]} <Icon name="chevron"/></div>
        <ul class:visible={isClickExpanded}>
            {#each Object.entries(options) as [key, value]}
            <li class="option" 
                on:click={()=>isClickExpanded=false}
                on:click={handleClickFunc(key)}>{value}</li>
            {/each}
        </ul>
    </li>
</ul>

