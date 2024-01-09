import { Message, Question } from '@/models/chat';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Conversation = Question & {
  name: string;
  timestamp: number;
};

const initialState: Conversation[] = [];

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation(
      state,
      action: PayloadAction<Omit<Conversation, 'messages'>>
    ) {
      const { name, timestamp, sourceId } = action.payload;
      const conversation = state.find((con) => con.sourceId === sourceId);
      if (!conversation) {
        state.push({ name, timestamp, sourceId, messages: [] });
      }
    },
    addMessageToConversation(
      state,
      action: PayloadAction<{ sourceId?: string; message: Message }>
    ) {
      const { sourceId, message } = action.payload;
      const conversation = state.find((con) => con.sourceId === sourceId);
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    deleteConversation(state, action: PayloadAction<{ sourceId: string }>) {
      const { sourceId } = action.payload;
      const conversationIndex = state.findIndex(
        (conversation) => conversation.sourceId === sourceId
      );
      if (conversationIndex !== -1) {
        state.splice(conversationIndex, 1);
      }
    },
  },
});

export default conversationsSlice.reducer;

export const { addConversation, addMessageToConversation, deleteConversation } =
  conversationsSlice.actions;

export const selectConversations = (state: RootState) => state.conversations;

export const selectConversationById = (state: RootState, sourceId?: string) =>
  state.conversations.find(
    (conversation) => conversation.sourceId === sourceId
  );
