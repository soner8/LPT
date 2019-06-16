import React from 'react'
import {Card, Image} from "semantic-ui-react";
export default class Post extends React.Component {

  render() {

    const styles = {
      card: {
        height: "350px",
        margin: 'auto'
      },
      image: {
        height: "300px"
      }
    }

    return (
      <Card style={styles.card}>
        <Image style={styles.image} src={this.props.post.imageUrl}/>
        <Card.Content>
          <Card.Header>
            {this.props.post.description}
          </Card.Header>
        </Card.Content>
      </Card>
    )
  }
}
