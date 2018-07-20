(ns clj-jwt-example.handler
  (:require [buddy.sign.jwt :as jwt]
            [compojure
             [core :refer :all]
             [route :as route]]
            [hiccup.core :refer [html]]
            [ring.middleware.defaults :refer [site-defaults wrap-defaults]]
            [ring.util.response :as resp]))

(def ^:private users
  "Mapping that is a mock of a username/password database"
  {"test@metabase.com" {:email      "test@metabase.com"
                        :first-name "Test"
                        :last-name  "User"
                        :password   "test1"}})

(defn- authenticate-user [username password]
  (when-let [found-user (get users username)]
    (when (= (:password found-user) password)
      found-user)))

(def ^:private shared-secret
  "shared secret string with metabase")

(def ^:private metabase-jwt-url
  "http://localhost:3000/auth/sso")

(def ^:private redirectable-hosts
  #{"localhost"})

(defn- validate-redirect [uri-str]
  (let [uri (java.net.URI. uri-str)
        host (.getHost uri)]
    ;; If the host is nil, it's localhost, otherwise check against our redirectable hosts set
    (assert (or (nil? host)
                (contains? redirectable-hosts host))
            (format "Host '%s' not recognized as a redirectable host" host))))

(defn- redirect-user-with-jwt [{:keys [email first-name last-name]} return_to]
  (validate-redirect return_to)
  (let [jwt (jwt/sign {:email email, :first_name first-name :last_name last-name}
                      shared-secret)]
    (resp/redirect (str metabase-jwt-url "?jwt=" jwt "&return_to=" return_to))))

(defroutes app-routes
  (GET "/login" [return_to]
       (html
        [:html
         [:h1 "Login"]
         [:form {:method "post", :action "/login"}
          [:label "Username"]
          [:input {:type "text"
                   :name "username"}]
          [:label "Password"]
          [:input {:type "password"
                   :name "password"}]
          [:input {:type "hidden"
                   :name "return_to"
                   :value return_to}]
          ;; Needs to be included with the anti-forgery middleware that is included in the `site-defaults` below
          [:input {:type "hidden"
                   :name "__anti-forgery-token"
                   :value ring.middleware.anti-forgery/*anti-forgery-token*}]
          [:input {:type "submit"
                   :value "Submit"}]]]))
  (POST "/login" {:as req}
        (let [{:strs [username password return_to]} (:form-params req)]
          (if-let [user (authenticate-user username password)]
            (redirect-user-with-jwt user return_to)
            {:status 403
             :body "Authentication failed"})))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
