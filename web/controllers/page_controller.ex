
defmodule GitHub do
  use HTTPotion.Base

  def process_url(url) do
    "https://api.github.com/" <> url
  end

  def process_request_headers(headers) do
    headers = Dict.put headers, :"User-Agent", "gauravmi"
    headers = Dict.put headers, :access_token, "d012ecb85e89b6de8e170ca915a6b58f213a8e93"
    headers
  end
end

defmodule StoryTeller.PageController do
  require Logger
  use StoryTeller.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def search(data, search) do
    if not String.starts_with?(search, "#"), do: search = "#" <>search
    Enum.filter(data, fn(x) -> String.contains? x["commit"]["message"], search end)
  end

  def commits(conn, params) do    
    responseJSON = Poison.Parser.parse!(GitHub.get("repos/gauravmi/StoryTeller/commits").body)
    actualCommits = search(responseJSON,params["q"])
    conn
       |> put_status(201)
       |> json actualCommits
  end
end
