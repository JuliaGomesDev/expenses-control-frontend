const transactionService = {
  findByUser: () => {
    return callApi({
      method: 'GET',
      url: 'https://api-apontamento-gastos.onrender.com/transactions'
    })
  },
  findByUid: (uid) => {
    return callApi({
      method: 'GET',
      url: `https://api-apontamento-gastos.onrender.com/transactions/${uid}`
    })
  },
  remove: (transaction) => {
    return callApi({
      method: 'DELETE',
      url: `https://api-apontamento-gastos.onrender.com/transactions/${transaction.uid}`
    })
  },
  save: (transaction) => {
    return callApi({
      method: 'POST',
      url: 'https://api-apontamento-gastos.onrender.com/transactions',
      params: transaction
    })
  },
  update: (transaction) => {
    return callApi({
      method: 'PATCH',
      url: `https://api-apontamento-gastos.onrender.com/transactions/${transaction.uid}`,
      params: transaction
    })
  }
}

function callApi({ method, url, params }) {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url, true)
    xhr.setRequestHeader(
      'Authorization',
      await firebase.auth().currentUser.getIdToken()
    )
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        const json = JSON.parse(this.responseText)
        if (this.status != 200) {
          reject(json)
        } else {
          resolve(json)
        }
      }
    }

    xhr.send(JSON.stringify(params))
  })
}
