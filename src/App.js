import React from "react";
import ReactPlayer from "react-player";
import Wheel from "./components/Wheel";
import ItemForm from "./components/ItemForm";
import Result from "./components/Wheel/Result";
import NavigationBar from "./components/NavigationBar";
import { Button, Modal, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items:
        JSON.parse(localStorage.getItem("itemsList")) == null
          ? localStorage.setItem(
              "itemsList",
              JSON.stringify([
                "Ali",
                "Beatriz",
                "Charles",
                "Diya",
                "Eric",
                "Fatima",
                "Gabriel",
                "Hanna",
              ])
            )
          : JSON.parse(localStorage.getItem("itemsList")),
      spinning: false,
      text: "",
      winners: [],
      selected: "Entries",
      openModal: false,
      wheelColor: `${localStorage.getItem("wheelColor")}`,
      fontColor: `${localStorage.getItem("fontColor")}`,
      marks: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 20,
          label: "20",
        },
        {
          value: 30,
          label: "30",
        },
        {
          value: 40,
          label: "40",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 60,
          label: "60",
        },
      ],
      url:
        localStorage.getItem("urlYoutube") == null
          ? localStorage.setItem(
              "urlYoutube",

              "https://www.youtube.com/watch?v=40vHCH6l2lM"
            )
          : localStorage.getItem("urlYoutube"),
      controls: true,
      loop: true,
    };
  }

  load = (url) => {
    this.setState({
      url,
    });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  ref = (player) => {
    this.player = player;
  };

  changeWheelAndFontColor = (color) => {
    this.setState({ wheelColor: color.wheelColor, fontColor: color.fontColor });
  };

  cancelModal = () => {
    this.setState({ openModal: false });
  };

  removeWinnerModal = () => {
    const winner = this.state.winners[this.state.winners.length - 1];
    const index = this.state.items.indexOf(winner);
    this.state.items.splice(index, 1);
    this.setState(
      (prevState) => ({
        items: prevState.items,
        openModal: false,
      }),
      () => {
        console.log(`Removed ${winner} from entries.`);
      }
    );

    localStorage.setItem("itemsList", JSON.stringify(this.state.items));
  };

  addData = (val) => {
    localStorage.setItem("itemsList", JSON.stringify(val));
    this.setState({ items: JSON.parse(localStorage.getItem("itemsList")) });
  };

  // use arrow function so we don't have to .bind(this) in constructor
  selectResultEventHandler = (data) => {
    if (this.state.items.length > 0 && this.state.spinning !== true) {
      var selectedIndex = data;

      // set this state to disable tab and wheel click when spinning
      this.setState({ spinning: true });

      // Disable function of Entries tab
      if (this.state.selected === "Entries") {
        // when spinning disable update player
        document.getElementById("inputTextArea").disabled = true;
        document.getElementById("updateButton").disabled = true;

        // after done spinning enable update player
        setTimeout(() => {
          this.setState({ spinning: false });
          document.getElementById("inputTextArea").disabled = false;
          document.getElementById("updateButton").disabled = false;
        }, localStorage.getItem("duration") * 1000);
      } else {
        // Disable function of Result tab
        // when spinning disable clear list
        document.getElementById("clearListButton").disabled = true;

        setTimeout(() => {
          this.setState({ spinning: false });
          document.getElementById("clearListButton").disabled = false;
        }, localStorage.getItem("duration") * 1000);
      }

      setTimeout(() => {
        this.setState((state) => ({
          winners: state.winners.concat(this.state.items[selectedIndex]),
        }));
      }, localStorage.getItem("duration") * 1000);

      setTimeout(() => {
        this.setState({ openModal: true });
      }, localStorage.getItem("duration") * 1000);
    }
  };

  // use arrow function so we don't have to .bind(this) in constructor
  clearListEventHandler = () => {
    this.setState({
      winners: [],
    });
  };

  render() {
    const { url, playing, controls, loop } = this.state;
    // set spin duration to local storage, when custom duration will update local storage
    if (localStorage.getItem("duration") === null)
      localStorage.setItem("duration", 10);

    if (localStorage.getItem("wheelColor") === null)
      localStorage.setItem("wheelColor", "#d38c12");

    if (localStorage.getItem("fontColor") === null)
      localStorage.setItem("fontColor", "#FFFFFF");

    let newWinnerIndex = this.state.winners.length - 1;

    return (
      <div>
        <NavigationBar onChange={this.changeWheelAndFontColor} />
        <Modal show={this.state.openModal} onHide={this.cancelModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>We have a winner 🎉</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.winners[newWinnerIndex]}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.removeWinnerModal}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
        <Container fluid>
          <Row>
            <Col className="mt-4" lg="6" md="auto">
              <Wheel
                items={this.state.items}
                onChange={this.selectResultEventHandler}
                spinning={this.state.spinning}
                wheelColor={this.state.wheelColor}
                fontColor={this.state.fontColor}
              />
            </Col>
            <Col lg="3" md="auto">
              <div id="Tabs" className="mt-4">
                <Tabs
                  defaultActiveKey="entries"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="entries" title="Entries">
                    <ItemForm
                      items={this.state.items}
                      winners={this.state.winners}
                      onDeleteByIndex={this.onDeleteByIndex}
                      onClick={(value) => this.addData(value)}
                      // pass this key to fix bug when remove winner, textarea won't update
                      // read more: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
                      key={this.state.items}
                    />
                  </Tab>
                  <Tab eventKey="results" title="Results">
                    <Result
                      onChange={this.clearListEventHandler}
                      winners={this.state.winners}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Col>
            <Col
              className="mt-4"
              xxl={{ span: 3, order: "first" }}
              xl={{ span: 3, order: "first" }}
              lg={{ span: 3, order: "first" }}
              md={{ order: "last" }}
            >
              <section id="youtubeSection" className="section">
                <h2>Youtube url player</h2>
                <ReactPlayer
                  ref={this.ref}
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={url}
                  playing={playing}
                  controls={controls}
                  light={false}
                  loop={loop}
                  volume={null}
                  muted={false}
                  onReady={() => console.log("onReady")}
                  onStart={() => console.log("onStart")}
                  onPlay={this.handlePlay}
                  onEnablePIP={this.handleEnablePIP}
                  onDisablePIP={this.handleDisablePIP}
                  onPause={this.handlePause}
                  onBuffer={() => console.log("onBuffer")}
                  onSeek={(e) => console.log("onSeek", e)}
                  onEnded={this.handleEnded}
                  onError={(e) => console.log("onError", e)}
                  onProgress={this.handleProgress}
                  onDuration={this.handleDuration}
                />
                <table style={{ width: "100%", marginTop: "10px" }}>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="loop">Loop</label>
                      </th>
                      <td>
                        <input
                          id="loop"
                          type="checkbox"
                          checked={loop}
                          onChange={this.handleToggleLoop}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Video URL</th>
                      <td>
                        {/* <InputGroup className="">
                          <FormControl
                            placeholder="Enter URL"
                            ref={(input) => {
                              this.urlInput = input;
                            }}
                            type="text"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={() => {
                              localStorage.setItem(
                                "urlYoutube",
                                this.urlInput.value
                              );
                              this.setState({
                                url: `${localStorage.getItem("urlYoutube")}`,
                              });
                            }}
                          >
                            Load
                          </Button>
                        </InputGroup> */}
                        <div class="input-group mb-3">
                          <input
                            ref={(input) => {
                              this.urlInput = input;
                            }}
                            type="text"
                            class="form-control"
                            placeholder="Enter URL"
                          />
                          <Button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={() => {
                              localStorage.setItem(
                                "urlYoutube",
                                this.urlInput.value
                              );
                              this.setState({
                                url: `${localStorage.getItem("urlYoutube")}`,
                              });
                            }}
                          >
                            Load
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ marginTop: "10px" }}>
                  <tbody>
                    <h2>Music player</h2>
                    <tr>
                      <td>
                        <MusicPlayer />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
