import { Message } from '@/models/chat';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';

type PDFProps = {
  summaryData: Message[];
};

const styles = StyleSheet.create({
  role: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 800,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
  },
  page: {
    paddingHorizontal: 60,
    paddingVertical: 80,
  },
});

const Pdf = ({ summaryData }: PDFProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        {summaryData.map(({ content, role }) => {
          return (
            <View key={uuidv4()}>
              <Text key={uuidv4()} wrap={false} style={styles.text}>
                <Text style={styles.role}>{role}: </Text>
                {content}
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default Pdf;
