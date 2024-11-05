import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { goalAtom, roundAtom } from "./atoms";

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
`;

const TimeCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 2rem 3rem;
  font-size: 6rem;
  font-weight: bold;
  color: tomato;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 170px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Colon = styled.span`
  color: white;
  font-size: 4rem;
  font-weight: bold;
  margin: 0 0.5rem;
`;

const ControlButton = styled.button`
  background: white;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: -125px;
  left: 48%;
  transform: translateX(-50%);

  &:hover {
    background: #f8f8f8;
    transform: translateX(-50%) scale(1.05);
    transition: all 0.2s ease;
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  gap: 7rem;
  color: white;
  font-size: 1.2rem;
  margin-top: 8rem;
`;

const ProgressItem = styled.div`
  text-align: center;

  div:first-child {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  div:last-child {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 2rem;
`;

function Timer() {
  const TIME_LIMIT = 1;
  const [time, setTime] = useState(TIME_LIMIT);
  const [isRunning, setIsRunning] = useState(false);
  const [completedRound, setCompletedRound] = useRecoilState(roundAtom);
  // 4 round == 1 goal
  const [completedGoal, setCompletedGoal] = useRecoilState(goalAtom);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((current) => current - 1);
      }, 1000);
    }

    if (time === 0) {
      setTime(TIME_LIMIT);
      setIsRunning(false);
      setCompletedRound((current) => current + 1);
    }

    if (completedRound === 2) {
      setCompletedGoal((current) => current + 1);
      setCompletedRound(0);
    }

    return () => clearInterval(interval);
  }, [time, isRunning]);

  const onButtonClick = () => {
    setIsRunning((current) => !current);
  };

  return (
    <MainContent>
      <TimerContainer>
        <TimeCard>{Math.floor(time / 60)}</TimeCard>
        <Colon>:</Colon>
        <TimeCard>{time % 60 < 10 ? "0" + (time % 60) : time % 60}</TimeCard>
        <ControlButton onClick={onButtonClick}>
          {isRunning ? (
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
            </svg>
          ) : (
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
            </svg>
          )}
        </ControlButton>
      </TimerContainer>
      <ProgressContainer>
        <ProgressItem>
          <div>{completedRound}/4</div>
          <div>Round</div>
        </ProgressItem>
        <ProgressItem>
          <div>{completedGoal}/12</div>
          <div>Goal</div>
        </ProgressItem>
      </ProgressContainer>
    </MainContent>
  );
}

export default Timer;
