<script lang="ts">
export let name: IconKey;
export let width = '1rem';
export let height = '1rem';
export let focusable = false;
type IconKey = 'info' | 'chevron' | 'copy' | 'link' | 'check'
type IconData = {
  box: number,
  svg: string
}
type IconMap = { [name in IconKey]: IconData };

let icons: IconMap = {
	info: {
		box: 24,
		svg: '<path d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z" fill="currentColor"/><path d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" fill="currentColor"/>'
	},
	chevron: {
		box: 20,
		svg: '<path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"/>'
	},
	copy: {
		box: 24,
		svg: `<path d="M13 7H7V5H13V7Z" fill="currentColor" />
    <path d="M13 11H7V9H13V11Z" fill="currentColor" />
    <path d="M7 15H13V13H7V15Z" fill="currentColor" />
    <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
    fill="currentColor"
    />`
	},
	check: {
		box: 24,
		svg: ` <path
    d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
    fill="currentColor"
  />
    `
	},
	link: {
		box: 24,
		svg: ` <path
    d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z"
    fill="currentColor"
  />
  <path
    d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z"
    fill="currentColor"
  />
  <path
    d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z"
    fill="currentColor"
  />`
	}
};
</script>

<svg
	class={$$props.class}
	focusable={focusable.toString()}
	{width}
	{height}
	viewBox="0 0 {icons[name].box} {icons[name].box}">{@html icons[name].svg}</svg>
