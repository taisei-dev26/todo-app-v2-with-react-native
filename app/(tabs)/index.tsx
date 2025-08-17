import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoScreen() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);


  const handleAddPress = () => {
    if (inputText.trim() !== '') {
      // 新しいTODOを作成
      const newTodo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };

      // 既存のTODOリストの先頭に新しいTODOを追加
      setTodos([newTodo, ...todos]);
      setInputText("");

      console.log(newTodo.id);
      // -> 1755464887715
      console.log("追加されたTODO:", newTodo);
      console.log("現在のTODOリスト:", [newTodo, ...todos]);
    }
  };

  const renderTodoItem = ({ item }: { item: Todo}) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
    </View>
  );

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

      {/* TODOリストの表示 */}
      <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item) => item.id} style={styles.todoList} showsVerticalScrollIndicator={false} />
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
  // デバッグ用のテキストスタイル
  debugText: {
    fontSize: 14, // 小さめの文字サイズ
    color: "#666", // グレーの文字色
    textAlign: "center", // 中央揃え
    marginBottom: 10, // 下の余白
    fontStyle: "italic", // 斜体
  },
  // 入力欄とボタンを横並びにするコンテナ
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  // テキスト入力欄のスタイル
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
  // 追加ボタンのスタイル
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
  // ボタン内のテキストスタイル
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // TODOリスト全体のスタイル
  todoList: {
    flex: 1, // 残りの画面スペースを全て使用
    marginTop: 10, // 上の余白
  },
  // 各TODOアイテムのスタイル
  todoItem: {
    backgroundColor: "#fff", // 白い背景
    padding: 15, // 内側の余白
    borderRadius: 8, // 角を丸く
    marginBottom: 10, // 下の余白（アイテム間の間隔）
    borderWidth: 1, // 枠線
    borderColor: "#eee", // 薄いグレーの枠線

    // 影の効果（iOS）
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // 影の効果（Android）
    elevation: 2,
  },
  // TODOアイテム内のテキストスタイル
  todoText: {
    fontSize: 16, // 文字サイズ
    color: "#333", // 文字色
    lineHeight: 20, // 行の高さ
  },
});