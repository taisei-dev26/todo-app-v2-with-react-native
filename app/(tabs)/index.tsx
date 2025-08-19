import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoScreen() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // データをデバイスに保存
  const saveTodos = async (todoList: Todo[]) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todoList));
    } catch (error) {
      console.error("TODOの保存に失敗：", error);
      Alert.alert("エラー", "データの保存に失敗しました");
    }
  };

  // データをデバイスから読み込む
  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("TODOの読み込みに失敗：", error);
      Alert.alert("エラー", "データの読み込みに失敗しました");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddPress = () => {
    if (inputText.trim() !== "") {
      // 新しいTODOを作成
      const newTodo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };

      // 既存のTODOリストの先頭に新しいTODOを追加
      const updatedTodos = [newTodo, ...todos];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setInputText("");
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={[styles.todoItem, item.completed && styles.completedTodo]}
      onPress={() => toggleTodo(item.id)}
    >
      <Text style={[styles.todoText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODOアプリ</Text>

      <Text style={styles.debugText}>
        入力中: {inputText} | TODO数: {todos.length}
      </Text>

      {/* 入力欄とボタン */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="新しいタスクを入力..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>追加</Text>
        </TouchableOpacity>
      </View>

      {/* TODOリストの表示 */}
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
      />
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
  completedTodo: {
    backgroundColor: "#f0f0f0", // 薄いグレー背景
    opacity: 0.7, // 少し透明に
  },
  // 完了済みテキストのスタイル
  completedText: {
    textDecorationLine: "line-through", // 取り消し線
    color: "#888", // 薄いグレー文字
  },
});
