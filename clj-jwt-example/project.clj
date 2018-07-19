(defproject clj-jwt-example "0.1.0-SNAPSHOT"
  :description "Example JWT-based SSO login application"
  :url "http://metabase.com"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.9.0"]
                 [compojure "1.5.1"]
                 [ring/ring-defaults "0.2.1"]
                 [buddy/buddy-core "1.2.0"]
                 [buddy/buddy-sign "1.5.0"]
                 [hiccup "1.0.5"]]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler clj-jwt-example.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}})
