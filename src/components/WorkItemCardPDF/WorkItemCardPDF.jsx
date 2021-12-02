import {Document, Page,View,Text,StyleSheet,Font} from "@react-pdf/renderer";

export const WorkItemCardPDF = ({author,duration}) => {
    Font.register({
        family: "Roboto",
        src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
    })

    const styles = StyleSheet.create({
        title: {
            display: 'block',
            margin: 0,
            padding: 10,

            color: 'white',
            border: '1px solid #756F86',

            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: '#756F86',
            fontFamily : "Roboto"
        },
        tableName: {
            display: 'grid',

            border: '1px solid #C7C5C5',
            gridTemplateColumns: 'repeat(2, 1fr)',
            fontFamily : "Roboto",
            marginBottom: 15
        },
        name: {
            display: 'inline-block',
            padding: 10,

            borderRight: '1px solid #C7C5C5',
            fontFamily : "Roboto"
        },
        nameLastChild: {
            display: 'inline-block',
            borderRight: 0,
            padding: 10,
            fontFamily : "Roboto"
        },
        author: {
            padding: 10,

            borderRight: '1px solid #C7C5C5',
            fontFamily : "Roboto"
        }
    })

    return (
            <Document language='en'>
                <Page size='A4'>
                    <Text style={styles.title}>Tабель учёта рабочего времени</Text>
                    <View style={styles.tableName}>
                        <Text style={styles.name}>{author}</Text>
                        <Text style={styles.nameLastChild}>{duration}</Text>
                    </View>
                </Page>
            </Document>
    )
}

