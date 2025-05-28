import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, Image, ScrollView } from "react-native";
import DocumentScanner from 'react-native-document-scanner-plugin';

// 扩展类型定义
declare module 'react-native-document-scanner-plugin' {
  interface ScanDocumentOptions {
    defaultFilter?: 'BLACK_AND_WHITE' | 'GRAYSCALE' | 'COLOR' | 'PHOTO';
  }
}

const Saved = () => {
  const [scannedImages, setScannedImages] = useState<string[]>([]);

  const handleOpenCamera = async () => {
    try {
      // 启动文档扫描器
      const { scannedImages: newImages } = await DocumentScanner.scanDocument({
        croppedImageQuality: 100, // 设置裁剪后的图片质量
        maxNumDocuments: 4, // 最多可以扫描4张
        defaultFilter: 'BLACK_AND_WHITE', // 设置默认滤镜为黑白模式
      });
    
      // 检查是否成功扫描到图片
      if (newImages && newImages.length > 0) {
        // 将新扫描的图片添加到现有图片数组中
        setScannedImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      Alert.alert('错误', '扫描过程中出现错误');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="扫描收据" onPress={handleOpenCamera} />
      <ScrollView style={styles.scrollView}>
        {scannedImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default Saved;

