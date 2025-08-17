import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodoScreen() {
  const [inputText, setInputText] = useState("");

  const handleAddPress = () => {
    console.log("入力された文字：", inputText);
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODOアプリ</Text>

      {/* デバッグ用: 現在の入力文字を表示 */}
      <Text style={styles.debugText}>入力中: {inputText}</Text>

      {/* 入力欄とボタン */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="新しいタスクを入力..."
          value={inputText}
          onChangeText={setInputText} // 文字が変わった時の処理
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>追加</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  debugText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
});
