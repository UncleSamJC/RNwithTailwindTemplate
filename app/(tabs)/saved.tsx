import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
// import { updateSearchCount } from '@service/supabase'; //

import { updateSearchCount } from "@/services/supabase";

const saved = () => {
  const handleInsert = () => {
    const mockdata = {
      id: 1,
      title: "avanter",
      adult: true,
      backdrop_path: "kkk",
      genre_ids: [1, 2, 3],
      original_language: "kkk",
      original_title: "kkk",
      overview: "kkk",
      popularity: 1,
      poster_path: "kkk",
      release_date: "kkk",
      video: true,
      vote_average: 222,
      vote_count: 333,
    };

    try {
      console.log('button clicked')
      updateSearchCount("t-search", mockdata);
      console.log("成功", "已成功插入一条数据");
    } catch (error) {
      console.log("错误", "插入失败，请检查控制台日志");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="插入00数据" onPress={handleInsert} />
    </View>
  );
};

export default saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
