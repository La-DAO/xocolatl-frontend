<script lang="ts">
import { createClient, setContextClient, gql, queryStore } from '@urql/svelte';
import { utils } from 'ethers';
import { connected, chainId } from 'svelte-ethers-store';

import { userXOCAllowance } from '../store/contractData.ts';
import { houseOfCoinContract, wrappedHouseOfCoinContract } from '../store/contracts';
import { chains } from '../chains';
import { approveXOC } from '../contractWrites';

/* import { collatRatioNum, collatRatioDenom, globalBase, WETHToXOC } from '../store/contractData'; */

const client = createClient({
	url: 'https://api.thegraph.com/subgraphs/name/0xnook/xocolatl-subgraph',
});

const users = queryStore({
	client: client,
	query: gql`
	query {
		users {
			id
			wethDeposited
			xocDebt
		}
	}
	`,
});

setContextClient(client);

async function getHealthRatio(address) {
	let healthRatio;
	try {
		healthRatio = await $houseOfCoinContract.computeUserHealthRatio(address, chains[$chainId].WETHAddress);
	} catch (e) {
		return 0;
	}
	return utils.formatEther(healthRatio);
}

async function liquidate(address: string) {
	/* await $houseOfCoinContract.liquidateUser(address, chains[$chainId].WETHAddress); */
	await $wrappedHouseOfCoinContract.liquidateUser(address, chains[$chainId].WETHAddress);
}
</script>

<style>
h1 {
	text-align: center;
}
table {
	margin: auto;
	text-align: center;
}
</style>

<h1>Liquidations</h1>

{#if $users.fetching || !connected }
	<p>Loading...</p>
{:else if $users.error || !($chainId in chains)}
	<p>Oh no... {$users.error.message}</p>
{:else}
	<table>
		{#each $users.data.users as user}
			<tr>
				<th>Address</th>
				<th>WETH</th>
				<th>XOC debt</th>
				<th>Health ratio</th>
				<th></th>
			</tr>
			<tr>
				<td>{user.id}</td>
				<td>{utils.formatEther(user.wethDeposited)}</td>
				<td>{utils.formatEther(user.xocDebt)}</td>
				<td>
					{#await getHealthRatio(user.id)}
						<p>...</p>
					{:then healthRatio}
						{healthRatio}
					{:catch error}
						<p style="color: red">{error}</p>
					{/await}
					<td>
					{#if $userXOCAllowance.gt(utils.parseUnits(user.xocDebt.toString(), 0))}
						<td><button on:click={liquidate(user.id)}>Liquidate</button></td>
					{:else}
						<td><button on:click={approveXOC}>Approve</button></td>
					{/if}
					</tr>
				{/each}
			</table>
		{/if}
