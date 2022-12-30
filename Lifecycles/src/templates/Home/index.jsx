import { Component } from 'react'
import './styles.css'
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/Input'

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 1,
    searchValue: '',
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postAndPhotos = await loadPosts()
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    })
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase())
        })
      : posts

    return (
      <section className="container">

        <div className="search-container">
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />

          <h2 className='search-definition'>Buscar por: {!!searchValue && searchValue}</h2>
        </div>

        {filteredPosts.length > 0 ? (
          <Posts posts={filteredPosts} />
        ) : (
          <h3 className="not-found">Não encontei nada! =( </h3>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              disabled={noMorePosts}
              text="Carregar mais posts..."
              onClick={this.loadMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
}

export default Home
