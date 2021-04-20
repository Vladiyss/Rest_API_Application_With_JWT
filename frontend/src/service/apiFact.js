import {endPoints} from "../constant/endPoints";

export const getAllFacts = (order) => {
    return fetch(endPoints.getFactsList + `?sort=likes&order=${order ? 1 : -1}`)
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));      
  }
  
export const createFact = (fact) => {
    return fetch(endPoints.postFact, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: fact
    }).then(response => response.json());
  }
  
export const likeFact = (factId) => {
    return fetch(endPoints.putFact(factId), {
        method: 'PUT',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({factId: factId})
    }).then(response => response.json());
  }
  
 
export const deleteFact = (factId) => {
    return fetch(endPoints.deleteFact(factId), {
        method: 'DELETE',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
    }).then(response => response.json());
  }