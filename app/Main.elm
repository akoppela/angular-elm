port module Main exposing (main)

import Html exposing (Html, beginnerProgram, div, input, label, node, text)
import Html.Attributes exposing (attribute, id, value)
import Html.Events exposing (on, onInput)
import Json.Decode as Decode exposing (Decoder)


-- MODEL


type alias Model =
    { name : String
    }


initialModel : Model
initialModel =
    Model "Initial model from Elm"



-- UPDATE


type Msg
    = UpdateName String


updateNameDecoder : Decoder Msg
updateNameDecoder =
    Decode.map UpdateName <|
        Decode.field "detail" Decode.string


update : Msg -> Model -> Model
update msg model =
    case msg of
        UpdateName name ->
            { model | name = name }



-- VIEW


view : Model -> Html Msg
view model =
    div
        [ id "container" ]
        [ label
            []
            [ text "I'm the input managed by Elm" ]
        , input
            [ onInput UpdateName
            , value model.name
            ]
            []
        , node "ng-model-to-elm"
            [ attribute "name" model.name
            , on "UpdateName" updateNameDecoder
            ]
            []
        ]



-- MAIN


main : Program Never Model Msg
main =
    beginnerProgram
        { model = initialModel
        , update = update
        , view = view
        }
