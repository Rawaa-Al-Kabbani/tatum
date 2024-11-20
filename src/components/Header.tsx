import { useLocation } from "preact-iso";
import { route } from "preact-router";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a
          href={"/Home"}
          class={url == "/Home" && "active"}
          onClick={() => route("/Home")}
        >
          Home
        </a>
      </nav>
    </header>
  );
}
