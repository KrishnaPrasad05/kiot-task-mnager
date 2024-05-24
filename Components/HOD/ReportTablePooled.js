import React, { useState, useEffect } from 'react';
import { View, Button, ScrollView, TouchableOpacity,Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const ReportTablePooled = () => {
  const [tableData, setTableData] = useState(null);
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://sumptuous-six-amazonsaurus.glitch.me/pooled');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data.length > 0) {
        // Extract columns from the first row
        setColumns(Object.keys(data[0]));
      }

      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadAndShareCSV = async () => {
    if (!tableData) {
      console.error('No data available to share.');
      return;
    }

    const csvData = tableData.map(row => columns.map(col => row[col]).join(',')).join('\n');

    try {
      const fileUri = FileSystem.cacheDirectory + 'data.csv';
      await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {tableData && columns.length > 0 && (
        <>
          <ScrollView horizontal>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row
                  data={columns}
                  style={{ height: 40, backgroundColor: '#D0EFCB' }}
                  textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                  widthArr={columns.map(() => 100)} // Set width for each column
                />
              </Table>
              <ScrollView horizontal>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={columns.map(col => rowData[col])}
                      style={{ height: 40, backgroundColor: index % 2 == 0 ? '#f9f9f9' : '#ffffff' }}
                      textStyle={{ textAlign: 'center' }}
                      widthArr={columns.map(() => 100)} // Set width for each column
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          <View style={{justifyContent:'center',alignItems:'center',padding:15}}>

          
          <TouchableOpacity style={{ backgroundColor: '#024c12',
    justifyContent:'center',alignItems:'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:120}} onPress={downloadAndShareCSV}>
<Text style={{color: 'white',}}>Share CSV</Text>
          </TouchableOpacity>
          </View>
         {/*  <Button title="Share CSV" onPress={downloadAndShareCSV} /> */}
        </>
      )}
    </View>
  );
};

export default ReportTablePooled;
