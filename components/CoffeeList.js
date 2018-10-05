import React, { Component } from 'react'
import { Tile, Text, View, TouchableOpacity, ImageBackground, Title, GridRow, ListView,
  Subtitle, Heading, Button, InlineGallery, GridView, Card, Divider, Image,
  Icon, Examples, Overlay, Caption } from '@shoutem/ui';

coffees = [
  {
    name: 'Flat White',
    price: 2.95,
    image: 'https://images.unsplash.com/photo-1503240778100-fd245e17a273?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5823b0366d25b9c5a458a4b703ee177e&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Cappuccino',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1512151004335-d5b6c2ff7e12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0586bd3c820b0c53f417fbce0758673d&auto=format&fit=crop&w=1949&q=80'
  },
  {
    name: 'Espresso',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1516646227334-6102731f3c25?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4cd28f267e54ad2fa3023963dc0c4974&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Black Americano',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Latte',
    price: 2.85,
    image: 'https://images.unsplash.com/photo-1518552782168-0396d0079475?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6472cc39dd19d16a845aec103ae90e51&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'White Americano',
    price: 2.05,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=89c21e12da5a1c16539ae341645fb184&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Macchiato',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1504194472231-5a5294eddc43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b744947120ad7eec0e49d0b5dde6f29a&auto=format&fit=crop&w=1950&q=80'

  }
]

export default class CoffeeList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    // This makes our first image take up the full width of the screen.
    if (index === '0') {
      return (
        <View key={index}>
          <ImageBackground
            styleName="large-square"
            source={{ uri: rowData[0].image }}
          >
            <Tile>
              <Title>{rowData[0].name}</Title>
              <Heading>£{rowData[0].price}</Heading>
              <Button styleName="md-gutter-top"><Text>ORDER</Text></Button>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </View>
      );
    }

    // All subsequent images are in a grid
    // with 2 coffees per row.
    const cellViews = rowData.map((coffee, id) => {
      return (
        <TouchableOpacity key={id}>
          <Card>
            <Image
              styleName="medium-wide"
              source={{uri: coffee.image}}
            />
            <View styleName="content">
              <Subtitle>{coffee.name}</Subtitle>
              <View styleName="horizontal v-center space-between">
                <View styleName="horizontal">
                  <Subtitle styleName="md-gutter-right">£{coffee.price}</Subtitle>
                </View>
                <Button styleName="tight clear"><Icon name="cart" /></Button>

              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });

    // This grid has 2 coffees per row.
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    // Group the restaurants into rows with 2 columns, except for the
    // first restaurant. The first restaurant is treated as a featured restaurant
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(coffees, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }
      return 1;
    });
    return (
      <ListView
        data={groupedData}
        renderRow={this.renderRow}
      />

    )
  }
}