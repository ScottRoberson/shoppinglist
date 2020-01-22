const deleteItem = document.querySelector('.delete-item');

const item = document.querySelector('.collection-item')

item.addEventListener('click', removeItem);

function removeItem(e) {

  const target = e.target;
  const id = target.getAttribute('data-id');
  console.log(id)

  fetch(`/api/items/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) return res.json()
    })
    .then(data => console.log(data))
  parent.window.location.reload(true);

}