import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, Image } from "react-native";
import DocumentScanner from 'react-native-document-scanner-plugin';

const Saved = () => {
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    try {
      // 启动文档扫描器
      const { scannedImages } = await DocumentScanner.scanDocument({
        croppedImageQuality: 100, // 设置裁剪后的图片质量
      });
    
      // 检查是否成功扫描到图片
      if (scannedImages && scannedImages.length > 0) {
        setScannedImage(scannedImages[0]);
      }
    } catch (error) {
      Alert.alert('错误', '扫描过程中出现错误');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="扫描收据" onPress={handleOpenCamera} />
      {scannedImage && (
        <Image
          source={{ uri: scannedImage }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: 400,
    marginTop: 20,
  },
});

export default Saved;

