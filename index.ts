import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {Document} from "langchain/document";
import {RetrievalQAChain} from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

const model = new ChatOpenAI({ modelName: "gpt-4" });

export function test() {
  function loadPDF(path: string) {

    const loader = new PDFLoader(path, {
      splitPages: false,
    });
    return loader.load()
  }

  async function createVectorStore(docs : Document[]) {
    return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
  }

  async function main() {
    const docs = await loadPDF(process.argv[2] )
    const vs = await createVectorStore(docs)
    const chain = RetrievalQAChain.fromLLM(model, vs.asRetriever(), {});

    const res = await chain.call({
      query: process.argv.splice(2).join(" "),
    });

    console.log(res.text)
  }
  main()
}
