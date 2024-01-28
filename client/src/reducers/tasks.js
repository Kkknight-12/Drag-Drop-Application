const TaskReducerInitialState = {
	isLoading: true, columnsFromBackendd: {},
};

const taskReducer = (state = TaskReducerInitialState, action) => {
	switch (action.type) {
		case "START_LOADING":
			return {...state, isLoading: true};
		case "END_LOADING":
			return {...state, isLoading: false};
		case "FETCH_ALL":
			const items = action.payload;
			return {
				...state, columnsFromBackendd: items,
			};

		default:
			return TaskReducerInitialState;
	}
};

export default taskReducer;