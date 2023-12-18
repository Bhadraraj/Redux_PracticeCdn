console.log(Redux);

// Action  Creator  1 
const newBooking = (name, amount) => {
    return {
        type: "New_Booking",
        payload: {
            name,
            amount,

        }
    }
}

// Action Creator 2
const cancelBooking = (name, refundAmount) => {
    return {
        type: "Cancel_Booking",
        payload: {
            name,
            refundAmount,

        }
    }
}

// Reducer - accepts action from the action creator  when the dispatch
//  Reducer 1 - ReservationHistory
const ReservationHistory = (oldReservationList = [], action) => {
    if (action.type === "New_Booking") {
        return [...oldReservationList, action.payload];
    } else if (action.type === "Cancel_Booking") {
        return oldReservationList.filter(record => {
            return record.name !== action.payload.name;
        });
    }
    return oldReservationList;
};

// Reducer 2 - cancelationHistory
const cancelationHistory = (oldCancellationList = [], action) => {
    if (action.type === "Cancel_Booking") {
        return [...oldCancellationList, action.payload];
    }
    return oldCancellationList;
};


// Reducer 3 - accounting
const accounting = (totalMoney = 1000, action) => {
    if (action.type === "New_Booking") {
        return totalMoney + action.payload.amount
    }

    else if (action.type === "Cancel_Booking") {
        return totalMoney - action.payload.refundAmount;

    }
    return totalMoney;
}

// Create Store 

const { createStore, combineReducers } = Redux;


// Create Central store  - it have ReservationHistory,accounting,cancelationHistory
const railwaycentralStore = combineReducers({
    accounting: accounting,
    ReservationHistory: ReservationHistory,
    cancelationHistory: cancelationHistory,
});

// Assign Central  Store  to Create Store
const store = createStore(railwaycentralStore);
const action1 = newBooking("Bhadri", 20)
// const action2 = newBooking("Bhadri", 20)
// const action3 = cancelBooking("Bhadri", 500)     
store.dispatch(action1);
// store.dispatch(action2);
// store.dispatch(action3);s
console.log(store.getState());

