# TODO App with React Native Expo

React Native Expo を使用したシンプルなTODOアプリケーションです。

## 📱 機能

- ✅ TODOアイテムの追加
- ✅ TODOリストの表示
- ✅ 完了/未完了の切り替え
- ✅ 完了済みアイテムの視覚的表示
- ✅ データの永続化（AsyncStorage）

## 🚀 セットアップ

### 前提条件

- Node.js (LTS版)
- npm または yarn
- Expo Go アプリ（テスト用）

### インストール

```bash
# プロジェクトのクローン
git clone <your-repository-url>
cd <project-directory>

# 依存関係のインストール
npm install

# AsyncStorageのインストール
npx expo install @react-native-async-storage/async-storage

# 開発サーバーの起動
npx expo start
```

## 📁 プロジェクト構造

```
src/
├── app/
│   └── (tabs)/
│       └── index.tsx          # メインのTODO画面
├── components/                # 再利用可能なコンポーネント
├── constants/                 # 定数定義
└── assets/                   # 画像やアイコン
```

## 🔧 技術スタック

- **React Native**: モバイルアプリ開発フレームワーク
- **Expo**: React Native開発プラットフォーム
- **TypeScript**: 型安全なJavaScript
- **AsyncStorage**: ローカルデータストレージ

## 📚 主要なReact Nativeコンポーネント

### 基本コンポーネント

#### SafeAreaView
```typescript
<SafeAreaView style={styles.container}>
  {/* アプリのコンテンツ */}
</SafeAreaView>
```
- **用途**: 安全な表示領域の確保
- **説明**: ノッチやステータスバーを避けてコンテンツを表示

#### View
```typescript
<View style={styles.inputContainer}>
  {/* 他のコンポーネント */}
</View>
```
- **用途**: コンテナとしてのレイアウト
- **説明**: HTMLのdivに相当、他の要素をグループ化

#### Text
```typescript
<Text style={styles.title}>TODOアプリ</Text>
```
- **用途**: テキストの表示
- **説明**: 全てのテキストはTextコンポーネントで囲む必要がある

#### TextInput
```typescript
<TextInput
  style={styles.textInput}
  placeholder="新しいタスクを入力..."
  value={inputText}
  onChangeText={setInputText}
/>
```
- **用途**: ユーザー入力の受け取り
- **重要なProps**:
  - `value`: 表示される値
  - `onChangeText`: 入力変更時のコールバック
  - `placeholder`: プレースホルダーテキスト

#### TouchableOpacity
```typescript
<TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
  <Text style={styles.addButtonText}>追加</Text>
</TouchableOpacity>
```
- **用途**: タップ可能なボタン
- **特徴**: タップ時に透明度が変化
- **重要なProps**:
  - `onPress`: タップ時のコールバック

#### FlatList
```typescript
<FlatList
  data={todos}
  renderItem={renderTodoItem}
  keyExtractor={(item: Todo) => item.id}
/>
```
- **用途**: 効率的なリスト表示
- **重要なProps**:
  - `data`: 表示する配列データ
  - `renderItem`: 各アイテムの描画関数
  - `keyExtractor`: 一意なキーの生成関数

## 🎨 スタイリング

### StyleSheet
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  // その他のスタイル...
});
```

### 重要なスタイルプロパティ

#### Flexbox
```typescript
{
  flex: 1,                    // 利用可能な空間を全て使用
  flexDirection: "row",       // 子要素を横並び配置
  justifyContent: "center",   // 主軸の中央揃え
  alignItems: "center",       // 交差軸の中央揃え
}
```

#### 余白とサイズ
```typescript
{
  padding: 20,               // 内側の余白
  margin: 10,                // 外側の余白
  paddingHorizontal: 12,     // 左右の内側余白
  paddingVertical: 8,        // 上下の内側余白
  marginBottom: 10,          // 下の外側余白
}
```

#### 装飾
```typescript
{
  backgroundColor: "#fff",    // 背景色
  borderRadius: 8,           // 角の丸み
  borderWidth: 1,            // 枠線の太さ
  borderColor: "#ddd",       // 枠線の色
  fontSize: 16,              // 文字サイズ
  fontWeight: "bold",        // 文字の太さ
  textAlign: "center",       // テキストの配置
}
```

## 🔄 状態管理

### useState Hook
```typescript
const [inputText, setInputText] = useState("");
const [todos, setTodos] = useState<Todo[]>([]);
```
- **用途**: コンポーネントの状態管理
- **パターン**: `[状態変数, 更新関数] = useState(初期値)`

### useEffect Hook
```typescript
useEffect(() => {
  loadTodos();
}, []);
```
- **用途**: 副作用の実行（データ取得、購読など）
- **依存配列**: `[]` は初回レンダリング時のみ実行

## 💾 データ永続化

### AsyncStorage
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// データの保存
const saveTodos = async (todoList: Todo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todoList));
  } catch (error) {
    console.error('保存エラー:', error);
  }
};

// データの読み込み
const loadTodos = async () => {
  try {
    const savedTodos = await AsyncStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  } catch (error) {
    console.error('読み込みエラー:', error);
  }
};
```

### 重要な概念
- **非同期処理**: `async/await` を使用
- **JSON変換**: オブジェクト ↔ 文字列の変換
- **エラーハンドリング**: `try/catch` でエラー処理

## 🏗️ TypeScript型定義

### インターフェース
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```
- **用途**: データ構造の型定義
- **利点**: コンパイル時の型チェック

### 関数の型定義
```typescript
const renderTodoItem = ({ item }: { item: Todo }) => (
  // コンポーネントの内容
);
```

## 🐛 開発時のデバッグ

### Console.log
```typescript
console.log('追加されたTODO:', newTodo);
console.log('現在のTODOリスト:', todos);
```

### 開発者メニュー
- **iOS Simulator**: `Cmd ⌘ + D`
- **Android Emulator**: `Ctrl + M`
- **実機**: デバイスを振る

## 📱 実行方法

### シミュレータで実行
```bash
npx expo start
# 表示されるオプションから選択
# i: iOS Simulator
# a: Android Emulator
# w: Web ブラウザ
```

### 実機で実行
1. Expo Go アプリをインストール
2. QRコードをスキャン
3. アプリが自動的に起動

## 🔄 Hot Reload
ファイルを保存すると自動的にアプリが更新されます。

### Fast Refresh を有効にする
1. 開発者メニューを開く
2. "Enable Fast Refresh" をタップ

## 🚀 本番ビルド

### APK/IPA ビルド（EAS Build）
```bash
# EAS CLIのインストール
npm install -g @expo/eas-cli

# ビルド設定
eas build:configure

# Androidビルド
eas build --platform android

# iOSビルド
eas build --platform ios
```

## 📱 ストア公開

### Google Play Store
```bash
eas submit --platform android
```

### Apple App Store
```bash
eas submit --platform ios
```

## 🤝 コントリビューション

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add some amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスです。

## 📞 サポート

質問や問題がある場合は、GitHubのIssuesで報告してください。

---

## 📚 参考リンク

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [AsyncStorage Documentation](https://github.com/react-native-async-storage/async-storage)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

*Made with ❤️ using React Native Expo*