import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Text } from 'react-native-elements';
import { db, auth } from '../firebase';
import axios from 'axios';

const SettingsScreen = ({ navigation }) => {
    const [owner, setOwner] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/receive-key").then(response => {
            setOwner(response.data);
        });

        db.collection('Users').where('Email', '==', owner).get().then(snapshot => {
            snapshot.forEach(doc => {
                setFirst(doc.get("FirstName"));
                setLast(doc.get("LastName"));
                setCompany(doc.get('Company'));
            });
            setLoading(false);
        }).catch(err => {
            console.log('Error getting documents', err);
            setLoading(false);
        });
    }, [owner]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.navigate('Login');
        }).catch(error => {
            console.error('Error signing out: ', error);
        });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView>
            <Card style={{height:'25%'}} onPress={() => navigation.navigate('Register')}>
                <View style={{ flexDirection:'row', flexWrap:'wrap', marginTop:15, left:'10%'}}>
                    <Image style={{width:65, height:65, borderRadius:100}} source={require('../assets/deloittedotlogo.webp')}/>
                    <Card.Content>
                        <Title>{first} {last}</Title>
                        <Paragraph>{company}</Paragraph>
                    </Card.Content>
                    <Image style={{width: 30, height: 30, left:135, marginTop:15}} source={require('../icons/arrow.png')}></Image>
                </View>
            </Card>
            <Card style={{height:'13%', top:'15%'}}>
                <Card.Content>
                    <Text>About</Text>
                    <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'15%'}}>
                <Card.Content>
                    <Text>Notifications</Text>
                    <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'30%'}}>
                <Card.Content>
                    <Text>Contact Us</Text>
                    <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'30%'}}>
                <Card.Content>
                    <Text>Share</Text>
                    <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'30%'}} onPress={handleLogout}>
                <Card.Content>
                    <Text style={{color:'red'}}>Logout</Text>
                    <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({});
