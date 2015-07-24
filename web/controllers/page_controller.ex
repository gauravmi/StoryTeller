defmodule StoryTeller.PageController do
  use StoryTeller.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
