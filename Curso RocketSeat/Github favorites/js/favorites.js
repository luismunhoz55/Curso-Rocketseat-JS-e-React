import { GithubUser } from "./githubuser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tBody = this.root.querySelector('table tbody');
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem
      ('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async addList(username) {
    try {

      const userExists = this.entries.find(entry => entry.login === username)
      if (userExists) {
        throw new Error('Usuário já cadastrado');
        return
      }

      const githubuser = await GithubUser.search(username)

      if (githubuser.login === undefined) {
        throw new Error('Usuário não encontrado');
      }

      this.entries = [githubuser, ...this.entries];
      this.update();
      this.save();

    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => user != entry)

    this.entries = filteredEntries
    this.save();
    this.update();
  }

}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update();
    this.onAdd();
  }

  update() {
    this.removeAllTr();


    this.entries.forEach(user => {
      let row = this.createRow(user.login, user.name, user.public_repos, user.followers)

      row.querySelector('.remove').onclick = () => {
        let isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if (isOk) {
          this.delete(user);
        }
      }

      this.tBody.append(row);
    })

  }

  onAdd() {
    const addButton = document.querySelector('.search button');
    addButton.onclick = () => {
      const value = document.querySelector('.search input').value;
      this.addList(value);
      // GithubUser.search(value).then(user => console.log(user));
    }
  }

  createRow(login, name, public_repos, followers) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/${login}.png" alt="">
        <a href="https://github.com/${login}" target="_blank">
          <p>${name}</p>
          <span>${login}</span>
        </a>
      </td>
      <td class="repositories">
        ${public_repos}
      </td>
      <td class="followers">
        ${followers}
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    return tr
  }

  removeAllTr() {
    this.tBody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }

}