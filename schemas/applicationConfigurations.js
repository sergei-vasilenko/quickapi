const applicationConfigurationsSchema = {
  plugins: "Object",
  global: {
    host: "string",
    credentials: "string",
    headers: "Array",
  },
  methods: { Map: "Method" },
};

export default applicationConfigurationsSchema;
