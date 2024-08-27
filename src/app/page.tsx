import CreateTodos from "../app/CreateTodos";
import Todos from "../app/Todos";
import { TodoProvider } from "../app/TodoContext";
import Header from "../app/Header";

export default function Home() {
  return (
    <TodoProvider>
      <Header />
      <div className="flex flex-col md:flex-row w-full p-5 md:p-20 bg-white/50">
        <div className="card bg-base-300 rounded-box grid flex-grow h-auto mb-5 md:mb-0">
          <Todos />
        </div>

        <div className="hidden md:block divider divider-horizontal"></div>

        <div className="card bg-base-300 rounded-box grid h-auto flex-grow">
          <CreateTodos />
        </div>
      </div>
    </TodoProvider>
  );
}
