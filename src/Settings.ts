const env = Deno.env.toObject();

export const isEtcdAvailable = async () => {
  let errorStr;
  try {
    const cmd = Deno.run({
      cmd: ["etcdctl"],
      stdout: "piped",
      stderr: "piped",
    });
    const error = await cmd.stderrOutput();
    errorStr = new TextDecoder().decode(error);
    cmd.close();
    // deno-lint-ignore no-empty
  } catch {}

  return errorStr;
};

export const getConfigFromLocalEtcdInstance = async (): Promise<Settings> => {
  const cmd = Deno.run({
    cmd: ["etcdctl", "get"],
    stderr: "piped",
  });

  const output = await cmd.output();
  const outStr = new TextDecoder().decode(output);
  cmd.close();

  const variables = outStr.split("\n");
  const config: { [key: string]: string } = {};
  for (let i = 0; i < outStr.length / 2; i++) {
    config[variables[0]] = variables[1];
  }
  return (config as unknown) as Settings;
};

type Settings = {
  PORT: number;
  MANGA_URL: string;
  API_ROOT: string;
};

export default {
  PORT: env.PORT || 8000,
  MANGA_URL: env.MANGA_URL || "https://manganelo.com/",
  API_ROOT: env.API_ROOT || "",
};
