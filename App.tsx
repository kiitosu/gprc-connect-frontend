import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

// 接続したいサービスをインポート
import { ElizaService } from "@buf/connectrpc_eliza.bufbuild_es/connectrpc/eliza/v1/eliza_pb";

// transportではどのタイプのエンドポイントを使うか定義します
// 今回はConnect endpointを使います。
// エンドポイントが`g-RPC-web`歯科対応していない場合は`createGrpcWebTransport`を使ってください
const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com"
})

// サービス定義とtransportを組み合わせてクライアントを作ります
const client = createClient(ElizaService, transport)