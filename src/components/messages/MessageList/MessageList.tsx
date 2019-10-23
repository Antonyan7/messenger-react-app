import React, {useContext, useEffect} from 'react';
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import {AppContext} from '../../../context/AppContext';
import {AuthContext} from "../../../context/AuthContext";
import SendIcon from "../../../assets/icons/SendIcon";
import './MessageList.css';
import Toolbar from "../../layouts/Toolbar";
import MobileBackToConversationList from "../../conversations/ConversationButtons/MobileBackToConversationList";
import LogoutButton from "../../auth/Logout";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loader from "../../../assets/loader/Loader";
import {ConversationListContext} from "../../../context/ConversationListContext";

function MessageList() {
    const {messages, activeChannelName} = useContext(AppContext);
    const {currentUser} = useContext(AuthContext);
    const {isLoading, updateIsLoading} = useContext(ConversationListContext);

    useEffect( () => {
      const messageContainer = document.getElementById("messagesList");
      if (messageContainer) {
        messageContainer.scrollIntoView(false)
      }
      updateIsLoading(false);
    },[messages]);

    const renderMessages = () => {
        let i = 0;
        let messageCount = messages.length;
        let messagesList = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current: any = messages[i];
            let next = messages[i + 1];
            let isMine = current.author === currentUser.id;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author === current.author;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author === current.author;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            messagesList.push(
                <Message
                    key={current.uuid || i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            i += 1;
        }
        return messagesList;
    };

    return (
        <React.Fragment>
          {/*{isLoading ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab laudantium minima reprehenderit similique velit. A aliquam debitis deserunt eaque enim illum ipsa magnam mollitia necessitatibus pariatur, quod temporibus ut, vero? Animi deserunt enim natus. A accusantium animi beatae delectus distinctio odit perferendis similique. Atque consequuntur error explicabo nisi quia saepe ullam voluptate. Corporis eius laudantium possimus quia ut! Adipisci consequuntur culpa dolor, hic, illum magni non odit omnis possimus quas, quidem sunt vero voluptatem. Amet at in mollitia officia officiis omnis possimus qui quidem soluta vero? Adipisci amet aspernatur at commodi debitis delectus dolore dolorum error expedita fugiat ipsa magnam quo tempore, tenetur veritatis? A, aliquam, dolorum expedita fugiat, incidunt quas quia quidem quisquam repellat sint voluptate voluptates voluptatibus. Corporis delectus dignissimos dolores, error eum exercitationem explicabo fuga fugiat fugit id illum impedit ipsa itaque obcaecati odio quas quia, reprehenderit saepe sapiente sunt totam unde veniam veritatis vero voluptate. Autem error explicabo, fugit hic maiores necessitatibus officiis omnis pariatur qui quidem repellendus suscipit unde vero voluptatem voluptates! Amet animi architecto atque consequatur corporis deleniti doloremque doloribus esse explicabo, harum id illo inventore ipsa laborum magnam nam neque obcaecati odit officiis perferendis praesentium quas quasi quia quibusdam quidem quisquam sapiente sed sequi sint sit tempore unde veniam voluptate. Consequatur deserunt dignissimos excepturi nihil? Accusamus delectus dicta exercitationem incidunt laborum porro quisquam repudiandae sequi ut voluptates. A ab blanditiis commodi debitis deleniti dignissimos eaque, earum, expedita fugit harum iure laudantium magni nihil nobis obcaecati odio optio praesentium quod ratione recusandae reiciendis, rem rerum sed soluta tempore tenetur voluptates. Adipisci asperiores atque consectetur dignissimos dolore doloremque eaque esse eum eveniet exercitationem expedita illo illum in itaque iure iusto labore laboriosam libero maxime odit officia possimus, praesentium quae quaerat quas qui quibusdam rem reprehenderit rerum sed sit tempora vel voluptate? Aliquam amet architecto, aspernatur assumenda consequatur consequuntur dolorum eius impedit magni molestiae, molestias nam nemo officia officiis perspiciatis provident repellendus tempore totam ullam voluptate. Accusamus adipisci aliquam asperiores aspernatur aut commodi dolore ea et eum ex impedit ipsa laudantium magnam minus molestias nam necessitatibus nemo nihil nostrum numquam optio pariatur perferendis quaerat quam, quas quod quos repellendus, rerum sapiente soluta suscipit temporibus totam vel! Ducimus iste itaque libero mollitia nesciunt nulla totam vel voluptates? Accusantium aliquam consequatur corporis, debitis dolores earum ex expedita obcaecati! Alias autem beatae consequuntur corporis, deserunt dicta excepturi hic in iste molestiae molestias porro sapiente totam, ullam voluptate! Animi autem delectus enim illum molestias nisi quod. Aliquid assumenda, enim fuga, fugiat impedit ipsum magni mollitia nam natus neque nesciunt nisi obcaecati optio recusandae, rem tempora unde veritatis vitae? Ab aliquid explicabo ipsum magnam modi nesciunt nulla perferendis, praesentium qui quia sint soluta tenetur ullam voluptate voluptates! Doloremque doloribus molestias qui quia. A ad aperiam debitis eos error excepturi exercitationem fugiat in labore laborum magni, minima neque officia possimus praesentium quas quisquam quos repudiandae sit suscipit veniam veritatis vero! Accusantium aliquid, assumenda autem consequatur debitis est, eum hic illo impedit libero mollitia nisi nulla odio omnis reiciendis repellendus sit. Suscipit, ullam?"+isLoading : ""}*/}
            <div className="messages-toolbar">
                <Toolbar
                    title={activeChannelName}
                    leftItems={activeChannelName ? [
                        <MobileBackToConversationList key='MobileBackToConversationList' />
                    ] : []}
                    rightItems={[
                        <LogoutButton key="logoutButton"/>
                    ]}
                />
            </div>
            {
                isLoading ? <Loader/> :
                activeChannelName &&
                <React.Fragment>
                  <PerfectScrollbar>
                    <div className="message-list" id="messagesScreen">
                      <div className="message-list-container" id="messagesList">
                        <div className="messages">
                            {renderMessages()}
                        </div>
                      </div>
                    </div>
                  </PerfectScrollbar>
                  <Compose rightItems={[
                      <SendIcon key="sendIcon"/>
                  ]}/>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default MessageList;
