# Learn React Http Request

## Rangkuman Belajar

## Permulaan
Untuk mendapatkan sample dari API dengan respon `.json`, bisa diakses di https://jsonplaceholder.typicode.com/

### Kapan waktu terbaik melakukan request data?

Lihat pada component lifecycle,
<center>
  <img src='./docs/images/react-component-lifecycle.png' style='max-width: 800px'>
</center>

dari `lifecycle` tersebut, waktu terbaik untuk melakukan `SIDE EFFECT` atau `request data` dari endpoint tertentu adalah pada saat `componentDidMount()`. Kok bisa? baca dokumentasi reactnya,
> componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

See more: https://reactjs.org/docs/react-component.html#componentdidmount