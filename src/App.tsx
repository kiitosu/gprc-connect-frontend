import { useState } from 'react'
import './App.css'

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

// 接続したいサービスをインポート
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_pb";

// transportではどのタイプのエンドポイントを使うか定義します
// 今回はConnect endpointを使います。
// エンドポイントが`g-RPC-web`歯科対応していない場合は`createGrpcWebTransport`を使ってください
const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com"
})

// サービス定義とtransportを組み合わせてクライアントを作ります
const client = createClient(ElizaService, transport)

function App() {
    const [inputValue, setInputValue] = useState("")
    const [messages, setMessages] = useState<
        {
            fromMe: boolean;
            message: String;
        }[]
    >([]);
    return <>
        <form onSubmit={async (e) => {
            e.preventDefault(); // ページリロードを避ける
            // メッセージを送信したらフォームをクリアします
            setInputValue("");
            // inputValueをmessageに登録し、fromMeのフラグをtrueとします
            setMessages((prev) => [
                ...prev,
                {
                    fromMe:true,
                    message: inputValue
                }
            ]);
            // レスポンス取得
            const response = await client.say({
                sentence: inputValue
            });
            // レスポンスをELIZAからのものとして登録する
            setMessages((prev) => [
                ...prev,
                {
                    fromMe:false,
                    message:response.sentence
                },
            ]);
        }}>
        <input value={inputValue} onChange={e =>setInputValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>

        <ol>
            {messages.map((msg, index) => (
                <li key={index}>
                    {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
                </li>
            ))}
        </ol>
    </>
}

export default App
