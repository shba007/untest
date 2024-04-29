export const useUserStore = defineStore('user', () => {
	const name = useState<string | null>()

	function updateName(value: string) {
		name.value = value
	}

	return { name, updateName }
})