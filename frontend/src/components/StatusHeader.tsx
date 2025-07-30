import { Spin, Typography, Switch } from "antd";
import { useMemo } from "react";
import { NotesReducerActionTypes, StatusTypes, type Action, type State } from "../types";
import { ClockCircleOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../store/ThemeContext";

const { Text } = Typography;

type StatusHeaderProps = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

function StatusHeader({ state, dispatch }: StatusHeaderProps) {
    const { theme } = useTheme();

    const StatusText = useMemo(() => {
        switch (state.status) {
            case StatusTypes.SAVING:
                return <><Text type="warning">Saving...</Text><Spin size="small" style={{ marginLeft: 8 }} /></>;
            case StatusTypes.SAVED:
                return <Text type="success">Saved!</Text>;
            case StatusTypes.ERROR:
                return <Text type="danger">Error</Text>;
            default:
                return <></>;
        }
    }, [state.status]);

    const formattedDate = useMemo(() => {
        if (!state.updatedAt) return 'NEW!';
        try {
            const date = typeof state.updatedAt === 'string' ? new Date(state.updatedAt) : state.updatedAt;
            return new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date);
        } catch {
            return '--';
        }
    }, [state.updatedAt]);

    return (
        <Wrapper $dark={theme === "dark"}>
            <StatusWrapper>
                <Text strong>Status:</Text>
                <span>{StatusText}</span>
            </StatusWrapper>
            <DateWrapper>
                <ClockCircleOutlined />
                <span>
                    Last updated:{" "}
                    {state.isLive ? (
                        <LiveIndicator>
                            <b>Live!</b>
                        </LiveIndicator>
                    ) : (
                        <b>{formattedDate}</b>
                    )}
                </span>
            </DateWrapper>
            <ToggleWrapper>
                <Switch 
                    size="small"
                    style={{ marginRight: 4 }}
                    checked={state.isRaw}
                    onChange={checked => dispatch({ type: NotesReducerActionTypes.SET_IS_RAW, payload: checked })}
                />
                <span>Show Raw</span>
            </ToggleWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ $dark?: boolean }>`
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    background: ${({ $dark }) => ($dark ? '#23272e' : '#f5f6fa')};
    color: ${({ $dark }) => ($dark ? '#f5f6fa' : 'inherit')};
    border-radius: 8px;
    padding: 14px 24px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
    gap: 24px;
    min-height: 56px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
    }
`;

const DateWrapper = styled.div`
    margin-left: auto;
    color: #888;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;

    @media (max-width: 600px) {
        margin-left: 0;
    }
`;

const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(82, 196, 26, 0); }
    100% { box-shadow: 0 0 0 0 rgba(82, 196, 26, 0); }
`;

const LiveIndicator = styled.span`
    color: #52c41a;
    font-weight: bold;
    margin-left: 6px;
    padding: 2px 10px;
    border-radius: 12px;
    background: rgba(82, 196, 26, 0.08);
    animation: ${pulse} 1.2s infinite;
    display: inline-block;
`;

export default StatusHeader;