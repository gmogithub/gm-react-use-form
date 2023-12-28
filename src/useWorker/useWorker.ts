import { useEffect, useRef } from "react";

interface UseWorkerOptions {
  timeInMs: number,
  timeStopInMs: number,
  launchStart: boolean
}

type TaskFunction<TaskData> = (task: TaskData) => void | Promise<void>;

export function useWorker<TaskData>(taskFunction: TaskFunction<TaskData>, optionsProp?: UseWorkerOptions) {
  const tasks = useRef<TaskData[]>([]);
  const isWork = useRef(false);
  const options = optionsProp ? optionsProp : { timeInMs: 1, timeStopInMs: 2000, launchStart: false };
  const intervalRef = useRef<number | null>(null);
  const timeLaunch = useRef<number>(new Date().getTime());
  const canRelaunchWorker = useRef(true);

  async function launchWorker() {
    if (!isWork.current && tasks.current.length > 0) {
      isWork.current = true;
      const tasksInProgress = [...tasks.current];
      for (const task of tasksInProgress) {
        await taskFunction(task);
      }

      tasks.current = tasks.current.filter(t => !tasksInProgress.includes(t));

      isWork.current = false;
    }
  }

  function launchInterval() {
    timeLaunch.current = new Date().getTime();
    console.info("Worker start");
    intervalRef.current = setInterval(async () => {
      const stop = timeLaunch.current + options.timeStopInMs;
      const currentTime = new Date().getTime();
      if (stop <= currentTime) {
        if (intervalRef.current) {
          console.info("Worker stop");
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      await launchWorker();
    }, options.timeInMs);
  }

  useEffect(() => {
    if (options.launchStart) {
      launchInterval();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function push(...task: TaskData[]) {
    if (intervalRef.current === null && canRelaunchWorker.current) {
      launchInterval();
    }
    timeLaunch.current = new Date().getTime();
    tasks.current.push(...task);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function kill() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      canRelaunchWorker.current = false;
    }
  }

  return { push, stop, kill };
}