import React from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class Searchscreen extends React.Component {
  constructor() {
    super()
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: ''
    }
  }
  async componentDidMount() {
    const query = await db.collection('transactions').limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }
  fetchMoreTransactions = async () => {
    var text=text.split('')
    text=text.toUpperCase()
    if(text[0]==='B'){
      const query = await db.collection('transactions').where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
    else if(text[0]==='S'){
      const query = await db.collection('transactions').where('studentId','==',text).startAfter(this.state.lastVisibleTransactions ).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
  }
  searchTransactions=async(text)=>{
    var text=text.split('')
    text=text.toUpperCase()
    if(text[0]==='B'){
      const query = await db.collection('transactions').where('bookId','==',text).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
    else if(text[0]==='S'){
      const query = await db.collection('transactions').where('studentId','==',text).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
  }
  render() {
    return (
      <View style={styles.container}> 
      <View style={styles.searchBar}> 
      <TextInput style={styles.bar} placeholder="Enter Book Id or Student Id" onChangeText={(text) => {
         this.setState({ search: text }) 
         }} /> 
         <TouchableOpacity style={styles.searchButton} onPress={() => { 
           this.searchTransactions(this.state.search) 
           }} > 
           <Text>
             Search
             </Text> 
             </TouchableOpacity> 
             </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={
            ({ item }) => {
              <View>
                <Text>
                  {'Book Id:' + item.bookId}
                </Text>
                <Text>
                  {'Student Id:' + item.studentId}
                </Text>
                <Text>
                  {'date:' + item.date.toDate()}
                </Text>
                <Text>
                  {'transaction type:' + item.transactionType}
                </Text>
              </View>
            }
          }
          keyExtractor={(item, index) => {
            index.toString()
          }}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        >
        </FlatList>
        </View>
        );
    }
  }
  const styles = StyleSheet.create({
   container: { flex: 1, marginTop: 20 },
    searchBar:{ 
      flexDirection:'row',
       height:40,
        width:'auto',
        borderWidth:0.5,
         alignItems:'center', 
         backgroundColor:'grey'
          },
           bar:{ 
             borderWidth:2,
              height:30,
               width:300,
                paddingLeft:10,
                 },
                  searchButton:{
                     borderWidth:1,
                      height:30, 
                      width:50,
                       alignItems:'center', 
                       justifyContent:'center',
                        backgroundColor:'green' 
                      }
                         })